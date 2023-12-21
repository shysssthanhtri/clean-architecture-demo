import express from 'express'

const main = async (): Promise<void> => {
  const app = express()
  app.listen(3000, () => {
    console.log('Listening...')
  })
}

main()
  .catch(err => {
    console.error(err)
    throw err
  })
