exports.author_list = async (req, res, next) => {
  try {
    res.send("NOT IMPLEMENTED: Author list");
  } catch (error) {
    next(error);
  }
};

exports.author_detail = async (req, res, next) => {
  try {
    res.send(`NOT IMPLEMENTED: Author detail: ${req.params.id}`);
  } catch (e) {
    next(e);
  }
};

exports.author_create_get = async (req, res, next) => {
  try {
    res.send("NOT IMPLEMENTED: Author create GET");
  } catch (e) {
    next(e);
  }
};

exports.author_create_post = async (req, res, next) => {
  try {
    res.send("NOT IMPLEMENTED: Author create POST");
  } catch (e) {
    next(e);
  }
};

exports.author_delete_get = async (req, res, next) => {
  try {
    res.send("NOT IMPLEMENTED: Author delete POST");
  } catch (e) {
    next(e);
  }
};

exports.author_update_get = async (req, res, next) => {
  try {
    res.send("NOT IMPLEMENTED: Author update GET");
  } catch (e) {
    next(e);
  }
};

exports.author_update_post = async (req, res, next) => {
  try {
    res.send("NOT IMPLEMENTED: Author update POST");
  } catch (e) {
    next(e);
  }
};
