import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { CoreProvider, customerApiAccount } from '@pizza-hut-us-development/client-core-staging'
import { useApollo } from '../lib/apollo'
import "../styles/global.css"

const username = "innocentnkubito92@gmail.com"

const mockCustomer = {
  channelId: "Pizzahut",
  coppaAgreement: true,
  email: username,
  emailOptIn: true,
  firstName: "Inno",
  lastName: "Nkubito",
  password: "password",
  phone: "2247035844",
  phoneExtension: "321",
  programs: [
    {
      active: true,
      programId: "1",
      tos: true
    }
  ],
  promotions: [
    {
      birthDate: "1992-11-30",
      contactMethods: [
        {
          type: "EMAIL",
          value: username
        },
        {
          type: "TEXT",
          value: "2247035844"
        }
      ],
      postalCode: "60103",
      tos: true,
      promotionId: "1"
    }
  ]
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CoreProvider env="staging" authChannel="PizzaHut">
      {/* @ts-ignore */}
      <Component {...pageProps} />
    </CoreProvider>
  )
}
