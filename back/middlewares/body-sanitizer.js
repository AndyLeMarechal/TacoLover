import sanitizeHtml from "sanitize-html";

export const bodySanitizer = (req, res, next) => {
  // Pour chaque propriété du BODY, on sanitized les propriétés qui sont des string.
  Object.keys(req.body).forEach(key => {
    if (typeof req.body[key] === "string") {
      req.body[key] = sanitizeHtml(req.body[key]);
    }
  });
  // Puis on passe la main au middleware suivant
  next();
};

