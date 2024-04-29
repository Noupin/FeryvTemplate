import { Request, Response, NextFunction } from "express";

export function requestLoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const start = new Date();
  console.log(
    `Request Start - ${req.method} ${
      req.originalUrl
    } @ ${start.toISOString()}...`
  );

  // To capture the end of the request, listen to the 'finish' event of the response
  res.on("finish", () => {
    const end = new Date();
    console.log(
      `...Request End - ${req.method} ${req.originalUrl} @ ${end.toISOString()}`
    );
  });

  next();
}
