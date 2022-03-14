import type { NextPage } from 'next'
import Head from 'next/head'
import Navigation from '../components/Navigation'
import SettingsButton from '../components/SettingsButton'
import Statistics from './statistics'


const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>GKeywords service</title>
      </Head>
      <main>
        <Navigation />
        <Statistics />
        <SettingsButton />
      </main>
    </>
  )
}

export default Home
