import React from "react";

import { AuthProviderWrapper} from './context/auth.context';

import Root from "./Root";

export default function App() {  
  return (
    <AuthProviderWrapper>
      <Root/>
    </AuthProviderWrapper>
  );
}



