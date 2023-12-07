import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import list from "./Donations.json";
import Link from "next/link";

const Products = () => {
  return (
    <div className="m-5">
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
        {list.map((item, index) => (
          <Link href={`/dona/${item.id}`}>
            <Card shadow="sm" key={index} isPressable className="max-w-xs mt-2">
              <CardBody className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={item.title}
                  className="object-cover"
                  src={item.img}
                />
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b>{item.title}</b>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
