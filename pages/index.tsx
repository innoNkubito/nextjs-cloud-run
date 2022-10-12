import React, { useState } from 'react'
import Link from 'next/link'
import { CustomerCreatePayload, customerApiAccount, useGetJwksQuery, storeApiLocalization, useSignInCustomerMutation } from '@pizza-hut-us-development/client-core-staging'
import Layout from '../components/Layout'
import Spinner from "../components/Spinner"

const testAccount = (username: string): CustomerCreatePayload => ({
  channelId: "PizzaHut",
  coppaAgreement: true,
  email: username,
  emailOptIn: true,
  firstName: "Inno",
  lastName: "Nkubito",
  password: "inkubito",
  phone: "2222222222",
  phoneExtension: "321",
  programs: [
    {
      active: true,
      programId: '1',
      tos: true,
    }
  ],
  promotions: [
    {
      birthDate: '1992-11-30',
      contactMethods: [
        {
          type: 'EMAIL',
          value: username,
        },
        {
          type: 'TEXT',
          value: '2222222222',
        },
      ],
      postalCode: '60660',
      tos: true,
      promotionId: '1',
    },

  ],
  tos: true
})

const IndexPage = () => {
  const [signIn, { isLoading: loggingIn }] = useSignInCustomerMutation()
  const [getCustomerInfo, { isLoading, isSuccess, data, isError, error }] = customerApiAccount.endpoints.customerInfo.useLazyQuery()

  const onFetchCustInfo = async () => {
    await getCustomerInfo()
  }

  let content = (
    <div>
      <button onClick={() => signIn({ username: "innocentnkubito92@gmail.com", password: "inkubito" })}>Login</button>
      <br />
      <button onClick={onFetchCustInfo}>
        Get Info
      </button>

    </div>
  )

  if (isLoading || loggingIn) {
    content = (<Spinner message="Logging in..." />)
  } else if (isSuccess) {
    content = (
      <div>
        <h4>Customer Info</h4>
        <div>{JSON.stringify(data)} </div>
      </div>)
  } else if (isError) {
    <div>Error ${error}</div>
  }

  return (
    <Layout title="PH CallCenter">
      {content}
    </Layout>
  )
}

export default IndexPage
