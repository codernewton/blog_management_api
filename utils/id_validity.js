//@@ import dependencies
import { isValidObjectId } from 'mongoose'

//@@ check id is valid or not
export const isValidId = (id) => {
  return isValidObjectId(id)
}