import { Badge, Box, Button, Card, Group, Image, Stack, Text } from '@mantine/core';

import { Product } from './types';

const ProductCard = ({ picture, name, description, price }: Product) => {
  return (
    <Card
      miw={180}
      h={"100%"}
      w={"100%"}
      shadow="sm"
      withBorder
      radius="md"
      dir="rtl"
    >
      <Card.Section>
        <Image src={picture} alt={`BlairTLV - ${name}`} />
      </Card.Section>
      <Card.Section h={"100%"}>
        <Stack p={20} h={"100%"} justify="space-between">
          <Box w={"70%"}>
            <Text fw={500}>{name}</Text>
            <Text fz="xs" c="dimmed">
              {description}
            </Text>
          </Box>
          <Group wrap="nowrap" gap={5} align={"center"}>
            <Button radius="xl">הזמיני עכשיו</Button>
            <Badge
              size="xl"
              variant="gradient"
              gradient={{ from: "cyan", to: "blue", deg: 160 }}
            >
              ₪{price}
            </Badge>
          </Group>
        </Stack>
      </Card.Section>
    </Card>
  );
};

export default ProductCard;
