import axios from 'axios';
import { Request, Response } from 'express';
import { returnErrorResponse } from '../utils/error-response.util';

const options = {
  method: 'GET',
  url: process.env.ENDPOINT_API_REST as string,
  params: {},
  headers: {
    'X-RapidAPI-Key': process.env.X_RapidAPI_Key as string,
    'X-RapidAPI-Host': process.env.X_RapidAPI_Host as string
  }
};

export const consumeApiRest = async (req: Request, res: Response) => {
  try {
    const { data } = await axios.request(options);
    res.send(data);
  } catch (error) {
    return returnErrorResponse(res, error);
  }
};
