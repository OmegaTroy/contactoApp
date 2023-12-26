export const validatorSchema =(schema)=> (req,res,next)=>{
  try {
    schema.parse(req.body)
    next()
  } catch (error) {
    console.log(error.errors.map(err=> err.message))
    return res.status(404).json(error.errors.map(err=> err.message))
  }
}