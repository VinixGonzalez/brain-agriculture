"use client";

import React from "react";

import {
  useDisclosure,
  Drawer as ChakraDrawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";
import { LuMenu } from "react-icons/lu";
import Link from "next/link";

const Drawer: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <LuMenu size={24} onClick={onOpen} />
      <ChakraDrawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader className="text-green-800">
            Brain Agriculture Menu
          </DrawerHeader>

          <DrawerBody>
            <ul className="flex flex-col items-center justify-center text-xl gap-4">
              <li>
                <Link
                  role="button"
                  onClick={() => onClose()}
                  href={"/dashboard"}
                  className="text-green-800 hover:text-green-700"
                >
                  DASHBOARD
                </Link>
              </li>
              <li>
                <Link
                  role="button"
                  onClick={() => onClose()}
                  href={"/producers"}
                  className="text-green-800 hover:text-green-700"
                >
                  PRODUTORES
                </Link>
              </li>
            </ul>
          </DrawerBody>
        </DrawerContent>
      </ChakraDrawer>
    </>
  );
};

export { Drawer };
