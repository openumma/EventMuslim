import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Router from 'next/router'
import Container from '../components/layouts/Container'
import Footer from '../components/layouts/Footer'
import Layout from '../components/layouts/Layout'
import Navigation from '../components/Navigation'
import axios from 'axios'

const Login = (props) => {
  const { className: style } = props
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }
  const handleLogin = async (e) => {
    e.preventDefault()
    await axios
      .post('http://localhost:3001/organizer/login/', {
        email: email,
        password: password,
      })
      .then(function (res) {
        console.log(res)
        Router.push(`/dashboard/${res.data.email}`)
      })
      .catch(function (err) {
        alert('Wrong password or email')
        console.log(err)
      })
  }
  return (
    <Layout>
      <header className={`shadow-md relative z-auto`}>
        <Container>
          <Navigation className={`flex justify-between items-center`}>
            <div className={`flex justify-between items-center //bg-green-300`}>
              {/* Logo */}
              <Link href='/'>
                <div className={`flex justify-between items-center mr-6 cursor-pointer`}>
                  <img className={`mr-2`} src='/images/icons/logo.png' alt='Logo' width='28' />
                  <h1 className={`text-base font-bold text-green-400`}>Event Muslim</h1>
                </div>
              </Link>
              {/* Search Bar */}
              <div className={`flex justify-between items-center`}>
                <input className={`bg-gray-100 py-2 px-3 rounded h-8 flex-1 w-48`} type='text' placeholder='Cari acara...' />
                <button className={`bg-green-400 rounded py-2 px-4 h-8 flex-1`} type='submit'>
                  <img src='/images/icons/icon-search.png' alt='Search' width='16' />
                </button>
              </div>
            </div>
            <div className={`flex justify-between items-center //bg-red-300`}>
              {/* <select className={`w-32 mr-8 bg-white`} name='telusuri' id='telusuri'>
                <option value='acara'> Acara</option>
                <option value='organizer'> Organizer</option>
              </select> */}
              <h6 className={`mr-8`}>Bantuan</h6>
              <Link href='/signup'>
                <a className={`bg-green-400 rounded py-2 px-4 box-border inline-block text-white cursor-pointer`} type='submit'>
                  Daftar Akun
                </a>
              </Link>
            </div>
          </Navigation>
        </Container>
      </header>
      <main>
        <Container>
          <div>
            <form className={`py-9 px-24 rounded-lg shadow-xl w-full sm:px-9`} action=''>
              <div className={`flex justify-between items-center`}>
                <div>
                  <h1 className={`font-bold text-3xl`}>Masuk Akun</h1>
                  <h6 className={`text-lg mt-6 mb-9`}>Masuk akun untuk memasang acara</h6>
                </div>
              </div>
              <div className={`mb-9`}>
                <h1 className={`font-bold text-xl mb-5`}>Email</h1>
                <input
                  onChange={handleEmail}
                  value={email}
                  required
                  className={`py-2 w-full px-4 text-lg rounded border-2 border-gray-200 focus:outline-none focus:border-2 focus:border-green-400`}
                  type='email'
                  placeholder='name@example.com'
                />
              </div>
              <div className={`mb-9`}>
                <h1 className={`font-bold text-xl mb-5`}>Password</h1>
                <input
                  onChange={handlePassword}
                  value={password}
                  required
                  className={`py-2 w-full px-4 text-lg rounded border-2 border-gray-200 focus:outline-none focus:border-2 focus:border-green-400`}
                  type='password'
                  placeholder='Masukkan password'
                />
              </div>
              <div>
                <button onClick={handleLogin} className={`bg-green-400 rounded-md py-2 text-base text-white block w-full`} type='submit'>
                  Masuk Akun
                </button>
                <h6 className={`text-lg text-center mt-6`}>
                  Belum memiliki akun?{' '}
                  <Link href='/signup'>
                    <span className={`text-green-400 underline cursor-pointer`}>Daftar</span>
                  </Link>
                </h6>
              </div>
            </form>
          </div>{' '}
        </Container>
      </main>
      <footer className={`bg-green-400 mt-20`}>
        <Container className={`bg-green-400`}>
          <Footer />
        </Container>
      </footer>
    </Layout>
  )
}

export default Login
