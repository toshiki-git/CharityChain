# -*- coding: utf-8 -*-

from sqlalchemy import create_engine
from sqlalchemy_utils import database_exists, create_database
from sqlalchemy.orm import sessionmaker, scoped_session
from db_model import Base

# Spring Bootの設定に基づいたデータベース接続情報
user_name = 'charity_user4'
password = 'charity_pass4'
host = "localhost:3306"
database_name = "charity"

# バインディング
DATABASE = f'mysql+pymysql://{user_name}:{password}@{host}/{database_name}?charset=utf8'

# DBとの接続
ENGINE = create_engine(
    DATABASE,
    echo=True  # 自動生成されたSQLを吐き出すようにする
)

# session変数にsessionmakerインスタンスを格納
session = scoped_session(
    sessionmaker(
        autocommit=False,
        autoflush=False,
        bind=ENGINE
    )
)

# DBが存在しなければ新規作成
if not database_exists(ENGINE.url):
    create_database(ENGINE.url)

# 定義されているテーブルを一括作成
Base.metadata.create_all(bind=ENGINE)

# DB接続用のセッションクラス、インスタンスが作成されると接続する
Base.query = session.query_property()