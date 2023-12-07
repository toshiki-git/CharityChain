# -*- coding: utf-8 -*-

# sqlalchemyライブラリから使用する型などをインポート
from sqlalchemy import Column, Integer, String,DateTime, ForeignKey
from sqlalchemy.orm import relationship
# CURRENT_TIMESTAMP関数を利用するためにインポート
from sqlalchemy.sql.functions import current_timestamp
# Baseクラス作成用にインポート
from sqlalchemy.ext.declarative import declarative_base

# Baseクラスを作成
Base = declarative_base()

# Baseクラスを継承したモデルを作成
# usersテーブルのモデルUsers
class Users(Base):
    __tablename__ = 'users'
    user_id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(20), nullable=False)
    password = Column(String(128), nullable=False)
    blockchain_address = Column(String(42), nullable=False)
    mail = Column(String(50),nullable=False,unique=True)
    created_at = Column(DateTime, server_default=current_timestamp())



# 寄付受け取りユーザテーブルのモデル
class DonationRecipientUsers(Base):
    __tablename__ = 'donation_recipient_users'
    new_user_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)

# 寄付・ユーザテーブルのモデル
class DonationUsers(Base):
    __tablename__ = 'donation_users'
    id = Column(Integer, primary_key=True, autoincrement=True)
    new_user_id = Column(Integer, ForeignKey('donation_recipient_users.new_user_id'), nullable=False)
    donation_id = Column(Integer, ForeignKey('donations.donation_id'), nullable=False) 


# 寄付テーブルのモデル
class Donations(Base):
    __tablename__ = 'donations'
    donation_id = Column(Integer, primary_key=True, autoincrement=True)
    donation_genre_name = Column(String(50), nullable=False)


# 口座テーブルのモデル
class Accounts(Base):
    __tablename__ = 'accounts'
    account_number = Column(String(20), primary_key=True)
    user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    balance = Column(Integer, nullable=False)
