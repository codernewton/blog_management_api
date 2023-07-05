//@@ error formatter
export const errorFormatter =  (message) => {
  let errors = {}
  const allErr = message.substring(message.indexOf(':') + 1).trim()
  const errArray = allErr.split(',').map(e => e.trim())
  errArray.forEach(e => {
    const [key,value] = e.split(':').map(e => e.trim())
    errors [key] = value
  })
  return errors
}