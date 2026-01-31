export function checkId(req, res, next) {

  // parse id
  const id = parseInt(req.params.id, 10); 

  // id must be a positive integer or else...
  if (isNaN(id) || id <= 0) {
    res.status(400).json({error: 'invalid ID (must be a positive integer)'});
    return; // error if not
  }

  // parse id then transmit to controller once validated
  req.params.id = parseInt(req.params.id, 10);

  // if everything's ok, move on
  next();
}