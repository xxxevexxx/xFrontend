"use client";

import { ReactNode } from "react";
import { SessionProvider as Provider } from "next-auth/react";

const SessionProvider = ({ children }:{children: ReactNode}) => {
  return <Provider>{children}</Provider>;
};

export default SessionProvider;