let sourceData = (res,req,next) => {
  req.body.sourcedata = 
  next()
}

module.exports = sourceData
