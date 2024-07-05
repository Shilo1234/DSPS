import "./App.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "@mantine/core/styles.css";
import {
  Container,
  TextInput,
  Button,
  Center,
  Stack,
  Text,
  Flex,
} from "@mantine/core";
import QrCode from "qrcode.react";

type FormData = {
  username: string;
};

const App: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [qrCodeData, setQrCodeData] = useState<string>("");

  const onSubmit = (data: FormData) => {
    const username = data.username.trim();
    if (username) {
      const profileUrl = `https://www.instagram.com/${username}/`;
      setQrCodeData(profileUrl);
    }
  };

  return (
    <Stack align="center" justify="center" w={"100%"} h={"100%"}>
      <Text size="xl">Instagram QR Code Generator</Text>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}
      >
        <TextInput
          placeholder="Enter Instagram Username"
          {...register("username", { required: true })}
          error={errors.username ? "Username is required" : undefined}
          style={{ marginRight: "10px", flex: 1 }}
        />
        <Button type="submit">Generate QR Code</Button>
      </form>
      {qrCodeData && (
        <>
          <Flex align={"center"} className="qr-code-container">
            <QrCode value={qrCodeData} />
          </Flex>
          <p style={{ marginTop: "10px" }}>
            QR code generated for <strong>{qrCodeData}</strong>
          </p>
        </>
      )}
    </Stack>
  );
};

export default App;
