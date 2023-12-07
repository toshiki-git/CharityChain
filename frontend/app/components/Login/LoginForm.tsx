"use client";
import React from "react";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  //ログインボタンを押された時の処理をここに書く
  const handleSubmit = async () => {
    try {
      // APIリクエストの設定
      const response = await fetch("http://localhost:8081/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mail: email,
          password: password
        })
      });
  
      if (response.ok) {
        const data = await response.json();
        // ここで必要な処理を行う（例：トークンを保存、ユーザーデータを取得など）
        // 成功したら指定のページにリダイレクトする
        localStorage.setItem("accessToken", data.access_token);  // トークンを保存
        console.log(data.access_token)
        router.push("/menu");
      } else {
      // レスポンスが成功ではない場合、エラーメッセージを表示
      const errorData = await response.json();
      alert("Login failed. Please check your email and password.");
      }
    } catch (error) {
      console.error("Error during login: ", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="flex justify-center items-center">
      <Card>
        <CardHeader>
          <div className="text-lg font-bold">Login</div>
        </CardHeader>
        <CardBody>
          <div>
            <Input
              type="email"
              label="Email"
              variant="bordered"
              placeholder="Enter your email"
              className="max-w-xs mb-4"
              value={email}
              onValueChange={setEmail}
            />
            <Input
              label="Password"
              variant="bordered"
              placeholder="Enter your password"
              value={password}
              onValueChange={setPassword}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <AiOutlineEyeInvisible className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <AiFillEye className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              className="max-w-xs mb-4"
            />
            <div className="flex justify-center">
              <Button
                onClick={handleSubmit}
                color="primary"
                radius="full"
                className="transition-transform duration-100 ease-in-out transform hover:scale-105"
              >
                Login
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default LoginForm;
