import "./App.css";
import "@mantine/carousel/styles.css";
import "@mantine/core/styles.css";

import { Carousel } from "@mantine/carousel";
import {
  AppShell,
  Box,
  Burger,
  Button,
  Container,
  Flex,
  Image,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconCertificate,
  IconCoin,
  IconHome,
  IconTruck,
} from "@tabler/icons-react";
import Autoplay from "embla-carousel-autoplay";
import QrCode from "qrcode.react";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";

import ProductCard from "./productCard";
import { Product } from "./types";

type FormData = {
  username: string;
};

interface FeatureProps {
  icon: React.FC<any>;
  title: string;
  description: string;
  buttonText: string;
}

function Feature({ icon: Icon, title, description, buttonText }: FeatureProps) {
  return (
    <Stack justify="space-between">
      <Stack h={"100%"} dir="rtl">
        <Flex h={"20%"} gap={10} align={"center"}>
          <Icon
            style={{
              color: "var(--mantine-color-blue-filled)",
              width: 36,
              height: 36,
            }}
            stroke={1.5}
          />
          <Text
            fw={700}
            fz="lg"
            mb="xs"
            mt={5}
            c={
              "light-dark(var(--mantine-color-black), " +
              "var(--mantine-color-white))"
            }
          >
            {title}
          </Text>
        </Flex>
        <Text c="dimmed" fz="sm">
          {description}
        </Text>
      </Stack>
      <Flex w={"100%"} justify={"flex-end"}>
        <Button miw={130} w={"33%"} variant="filled">
          <Text>{buttonText}</Text>
        </Button>
      </Flex>
    </Stack>
  );
}

const marketingText = [
  {
    icon: IconTruck,
    title: "Free Worldwide shipping",
    description:
      "As electricity builds up inside its body, it becomes more aggressive. One theory is that the electricity.",
    buttonText: "הזמיני עכשיו",
  },
  {
    icon: IconCertificate,
    title: "Best Quality Product",
    description:
      "Slakoth’s heart beats just once a minute. Whatever happens, it is content to loaf around motionless.",
    buttonText: "למועדפים",
  },
  {
    icon: IconCoin,
    title: "Very Affordable Pricing",
    description:
      "Thought to have gone extinct, Relicanth was given a name that is a variation of the name of the person who discovered.",
    buttonText: "מבצעים",
  },
];
const bestProducts: Product[] = [
  {
    name: "שרשרת נרקיס",
    picture: "src/assets/product3.webp",
    description: "אבן מואסנייט קראט אחד",
    price: 159,
  },
  {
    name: "עגילי עדן",
    picture: "src/assets/product2.webp",
    description: "אבן מואסנייט קראט אחד",
    price: 169,
  },
  {
    name: "צמיד טליה",
    picture: "src/assets/product.webp",
    description: "צמיד זנהב מעוטר אבני מואסנייט",
    price: 259,
  },
];
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
  const [opened, { toggle }] = useDisclosure();
  const autoplay = useRef(Autoplay({ delay: 4000 }));
  return (
    <AppShell
      header={{ height: 120 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header p={10}>
        <Flex justify={"space-between"} align={"center"} w={"100%"}>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Image w={100} src={"src/assets/logo.avif"}></Image>
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar>
        <Stack dir="rtl">
          <Flex
            p={10}
            style={{
              borderTop: "solid 2px #909090",
              borderBottom: "solid 2px #909090",
            }}
            gap={5}
            align={"center"}
          >
            <IconHome />
            <Text fw={700} fz={22}>
              בית
            </Text>
          </Flex>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        <Stack align="center" justify="center" w={"100%"} h={"100%"}>
          <Carousel
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
            withIndicators
            loop
            height={300}
          >
            <Carousel.Slide>
              <Image src={"src/assets/homepage2.webp"} />
            </Carousel.Slide>
            <Carousel.Slide>
              <Image src={"src/assets/homepage.jpeg"} />
            </Carousel.Slide>
          </Carousel>
          <Container mt={30} mb={30} size="lg">
            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={50}>
              {marketingText.map((item) => (
                <Feature {...item} key={item.title} />
              ))}
            </SimpleGrid>
          </Container>
          <ProductCard {...bestProducts[0]}></ProductCard>
          <Carousel
            w={"100%"}
            withIndicators
            slideSize="33%"
            slideGap="md"
            align="start"
            loop
          >
            {bestProducts.map((product) => (
              <Carousel.Slide>
                {/* <Box w={"33%"}> */}
                <ProductCard {...product}></ProductCard>
                {/* </Box> */}
              </Carousel.Slide>
            ))}
          </Carousel>
          <Text size="xl">Instagram QR Code Generator</Text>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
            }}
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
      </AppShell.Main>
    </AppShell>
  );
};

export default App;
