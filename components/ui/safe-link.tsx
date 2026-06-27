"use client";

import { useCallback } from "react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { isValidRoute } from "@/lib/broken-routes";
import type { ComponentProps, MouseEvent } from "react";

type SafeLinkProps = ComponentProps<typeof Link> & {
  toastMessage?: string;
};

export function SafeLink({
  href,
  onClick,
  toastMessage,
  ...rest
}: SafeLinkProps) {
  const { showToast } = useToast();
  const hrefStr = typeof href === "string" ? href : "";

  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      if (hrefStr && !isValidRoute(hrefStr)) {
        e.preventDefault();
        e.stopPropagation();
        showToast(toastMessage ?? "Coming Soon 🚀");
        return;
      }
      onClick?.(e);
    },
    [hrefStr, onClick, showToast, toastMessage]
  );

  const isInvalid = Boolean(hrefStr && !isValidRoute(hrefStr));

  return (
    <Link
      href={href}
      onClick={handleClick}
      prefetch={isInvalid ? false : rest.prefetch}
      {...rest}
    />
  );
}


