import random
import string
# FastAPIインポート
from fastapi import FastAPI
from fastapi import HTTPException
from fastapi.middleware.cors import CORSMiddleware
# 型ヒントを行えるpydanticをインポート
from pydantic import BaseModel  
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import JWTError, jwt
# パスワードのコンテキストを設定
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# 作成したモデル定義ファイルと設定ファイルをインポート
import db_model as m 
import db_setting as s 

SECRET_KEY = "your_secret_key"  # 安全なランダムキーを生成して使用する
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# CORS ミドルウェアの設定
origins = [
    "http://localhost:3000",  # フロントエンドのオリジン
    # 必要に応じて他のオリジンも追加
]

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# データクラス定義
# POSTとPUTで使うデータクラス
class UserBase(BaseModel):
    name : str
    mail : str
    password : str
    blockchain_address:str

# ログイン用データクラス
class Login(BaseModel):
    mail: str
    password: str

# 寄付受け取り受理登録用のデータクラス
class DonationRecipientRegistration(BaseModel):
    user_id: int

# 寄付ジャンル登録用のデータクラス
class DonationGenreRegistration(BaseModel):
    user_id: int
    donation_genre_name: str

# 送金用のデータクラス
class TransferMoney(BaseModel):
    sender_id: int
    receiver_id: int
    amount: int

class GenreName(BaseModel):
    donation_genre_name: str


# FastAPIのインスタンス作成
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

# GETメソッドで /usersにアクセスしたときの処理
# ユーザーの全件取得
@app.get("/users", tags=["users"])
async def read_users():
    #DBからユーザ情報を取得
    result = s.session.query(m.Users).all()
    return result

# ランダムな文字列を生成する関数
def generate_random_account_number(length=10):
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for i in range(length))

# POSTメソッドで /usersにアクセスしたときの処理
# ユーザーの新規登録
@app.post("/users", tags=["users"])
async def create_user(data: UserBase):
    # Usersモデルを変数に格納
    user = m.Users()
    # Accountsモデルを変数に格納
    account = m.Accounts()
    # セッションを新規作成
    session = s.session()
    try:
        # リクエストBodyで受け取ったデータをUserモデルに流し込む
        user.name = data.name
        user.mail = data.mail
        # パスワードをハッシュ化
        hashed_password = pwd_context.hash(data.password)
        user.password = hashed_password
        user.blockchain_address = data.blockchain_address

        # UserモデルをDBに追加
        session.add(user)
        session.flush()  # user_idを取得するためにflushを実行

        # Accountsモデルにデータを設定
        account.account_number = generate_random_account_number()
        account.user_id = user.user_id
        account.balance = 1000

        # AccountsモデルをDBに追加
        session.add(account)

        # 永続的にDBに反映
        session.commit()
        return {"message": "User created successfully"}
    except Exception as e:
        # DBへの反映は行わない
        session.rollback()
        return {"message": str(e)}
    finally:
        # 正常・異常どちらでもセッションは終わっておく
        session.close()

@app.post("/search-blockchain-addresses", tags=["users"])
async def search_blockchain_addresses(genre: GenreName):
    session = s.session()
    try:
        # 寄付ジャンルを検索
        donation = session.query(m.Donations).filter(m.Donations.donation_genre_name == genre.donation_genre_name).first()
        if not donation:
            return {"message": "Donation genre not found"}

        # 寄付ジャンルに関連するブロックチェーンアドレスを検索
        addresses = session.query(m.Users.blockchain_address)\
            .join(m.DonationRecipientUsers, m.Users.user_id == m.DonationRecipientUsers.user_id)\
            .join(m.DonationUsers, m.DonationRecipientUsers.new_user_id == m.DonationUsers.new_user_id)\
            .filter(m.DonationUsers.donation_id == donation.donation_id)\
            .all()

        # ブロックチェーンアドレスのリストを返す
        return {"blockchain_addresses": [address[0] for address in addresses]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        session.close()


# POSTメソッドで /register-donation-genreにアクセスしたときの処理
# 寄付ジャンル登録
@app.post("/register-donation-genre", tags=["users"])
async def register_donation_genre(data: DonationGenreRegistration):
    # DonationUsersモデルを変数に格納
    donation_user = m.DonationUsers()
    # セッションを新規作成
    session = s.session()
    try:
        # 寄付受け取りユーザを特定
        recipient_user = session.query(m.DonationRecipientUsers).filter(m.DonationRecipientUsers.user_id == data.user_id).first()
        if not recipient_user:
            return {"message": "Recipient user not found"}

        # 選択された寄付ジャンルのdonation_idを取得
        donation = session.query(m.Donations).filter(m.Donations.donation_genre_name == data.donation_genre_name).first()
        if not donation:
            return {"message": "Donation genre not found"}

        # DonationUsersモデルにデータを設定
        donation_user.new_user_id = recipient_user.new_user_id
        donation_user.donation_id = donation.donation_id

        # DonationUsersモデルをDBに追加
        session.add(donation_user)

        # 永続的にDBに反映
        session.commit()
        return {"message": "Donation genre registration successful"}
    except Exception as e:
        # DBへの反映は行わない
        session.rollback()
        return {"message": str(e)}
    finally:
        # 正常・異常どちらでもセッションは終わっておく
        session.close()

# DELETEメソッドで /usersにアクセスしたときの処理
# ユーザーの削除
@app.delete("/users/{id}", tags=["users"])
async def delete_user(id: int):
    # セッションを新規作成
    session = s.session()
    try:
        # 指定されたuser_idのユーザーを削除
        query = s.session.query(m.Users)
        query = query.filter(m.Users.user_id == id)
        query.delete()
        # 永続的にDBに反映
        session.commit()
    except:
        # DBへの反映は行わない
        session.rollback()
        raise
    finally:
        # 正常・異常どちらでもセッションは終わっておく
        session.close()

# POSTメソッドで /register-donation-recipientにアクセスしたときの処理
# 寄付受け取り受理登録
@app.post("/register-donation-recipient", tags=["users"])
async def register_donation_recipient(data: DonationRecipientRegistration):
    # DonationRecipientUsersモデルを変数に格納
    donation_recipient_user = m.DonationRecipientUsers()
    # セッションを新規作成
    session = s.session()
    try:
        # リクエストBodyで受け取ったuser_idをDonationRecipientUsersモデルに設定
        donation_recipient_user.user_id = data.user_id

        # DonationRecipientUsersモデルをDBに追加
        session.add(donation_recipient_user)

        # 永続的にDBに反映
        session.commit()
        return {"message": "Donation recipient registration successful"}
    except Exception as e:
        # DBへの反映は行わない
        session.rollback()
        return {"message": str(e)}
    finally:
        # 正常・異常どちらでもセッションは終わっておく
        session.close()

# PUTメソッドで /usersにアクセスしたときの処理
# ユーザーの更新
@app.put("/users/{id}", tags=["users"])
async def update_user(id: int, data:UserBase):
    # セッションを新規作成
    session = s.session()
    try:
        # ユーザー更新
        s.session.query(m.Users).\
        filter(m.Users.user_id == id).\
        update({"name" : data.name, "mail" : data.mail, "password": data.password, "blockchain_address": data.blockchain_address})
        # 永続的にDBに反映
        session.commit()
    except:
        # DBへの反映は行わない
        session.rollback()
        raise
    finally:
        # 正常・異常どちらでもセッションは終わっておく
        session.close()

# POSTメソッドで /loginにアクセスしたときの処理
# ユーザーのログイン処理
@app.post("/login", tags=["users"])
async def login(data: Login):
    # セッションを新規作成
    session = s.session()
    try:
        # メールアドレスとパスワードに基づいてユーザーを検索
        user = session.query(m.Users).filter(m.Users.mail == data.mail).first()
        if user and pwd_context.verify(data.password, user.password):
            access_token = create_access_token(data={"sub": user.mail})
            return {"access_token": access_token, "token_type": "bearer"}
        else:
            raise HTTPException(status_code=401, detail="Invalid login details")
    except Exception as e:
        # その他のエラーの場合
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        session.close()

# POSTメソッドで /transfer-moneyにアクセスしたときの処理
# 送金処理
@app.post("/transfer-money", tags=["users"])
async def transfer_money(data: TransferMoney):
    # セッションを新規作成
    session = s.session()
    try:
        # 送金者（sender）の口座を検索
        sender_account = session.query(m.Accounts).filter(m.Accounts.user_id == data.sender_id).first()
        if not sender_account or sender_account.balance < data.amount:
            return {"message": "Insufficient funds or sender not found"}

        # 受取人（receiver）の口座を検索
        receiver_account = session.query(m.Accounts).filter(m.Accounts.user_id == data.receiver_id).first()
        if not receiver_account:
            return {"message": "Receiver not found"}

        # 送金処理
        sender_account.balance -= data.amount
        receiver_account.balance += data.amount

        # データベースを更新
        session.commit()
        return {"message": "Transfer successful"}
    except Exception as e:
        # DBへの反映は行わない
        session.rollback()
        return {"message": str(e)}
    finally:
        # セッションは終わっておく
        session.close()