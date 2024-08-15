import { Card } from "@/components";
import { ProducerType } from "@/schemas/producerSchema";
import Link from "next/link";
import React from "react";

type ListProducerMobileType = {
  list: Array<ProducerType>;
};

export const ListProducerMobile: React.FC<ListProducerMobileType> = ({
  list,
}) => {
  return (
    <div className="flex flex-col gap-6">
      {list.map((producer) => (
        <Link key={producer.id} href={`producers/${producer.id}`}>
          <Card className="w-full">
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-lg">{producer.producerName}</p>
                <p>{producer.farmName}</p>
                <hr />
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <small className="text-xs">CIDADE</small>
                    <p>
                      <strong>{producer.city}</strong>
                    </p>
                  </div>
                  <div>
                    <small className="text-xs text-right">ESTADO</small>
                    <p className="text-right">
                      <strong>{producer.state}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};
