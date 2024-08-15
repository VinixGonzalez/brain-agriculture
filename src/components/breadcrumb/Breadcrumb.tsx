import React from "react";
import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";

type Crumb = {
  name: string;
  isCurrentPage: boolean;
  href: string;
};

type BreadcrumbProps = {
  crumbs: Array<Crumb>;
};

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ crumbs }) => {
  return (
    <ChakraBreadcrumb className="my-4">
      {crumbs.map((crumb) => (
        <BreadcrumbItem key={crumb.name} isCurrentPage={crumb.isCurrentPage}>
          <BreadcrumbLink href={crumb.href}>{crumb.name}</BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </ChakraBreadcrumb>
  );
};
