import IUserModel from '../models/user/IUserModel'
import Director from '../models/core/Director'

const jwt = require('jsonwebtoken')

/**
 * Secret token
 */
export const ACCESS_TOKEN_SECRET = 'aNhztLmF5F5RhHTxI9EJ6jodwefMq19m'

/**
 * Authorize function to authorize the token and to attach the user object to the request
 */
export function authorize(req: any, res: any, next: any): void {
  if (req.url != '/users' && req.url != '/users/validate') {
    let authHeader = req.headers.authorization
    if (authHeader) {
      authHeader = authHeader.split(' ')[1]
      //verifying the token
      jwt.verify(authHeader, ACCESS_TOKEN_SECRET, (err: any, userDetails: any) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            return res.status(401).send({ message: 'Session Expired' })
          } else {
            return res.sendStatus(403)
          }
        }
        //getting user model
        let user = Director.instance().getUserModel(userDetails.email)
        if (user) {
          //attaching user model to request
          req.body.user = user
          next()
        } else {
          res.sendStatus(401)
        }
      })
    } else {
      res.sendStatus(401)
    }
  } else {
    next()
  }
}

/**
 * Generates the Json Web Token with the secret token and with 7 day expiry
 * @param user user model
 */
export function generateToken(user: IUserModel): string {
  return jwt.sign({ email: user.getEmail(), role: user.getRole() }, ACCESS_TOKEN_SECRET, {
    expiresIn: '7d',
  })
}
