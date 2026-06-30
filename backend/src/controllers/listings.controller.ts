import type { Request, Response, NextFunction } from 'express'

import * as listingsService from '../services/listings.service'
import { AppError } from '../middleware/error.middleware'

export async function getListings(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const listings = await listingsService.getActiveListings()
    res.json(listings)
  } catch (err) {
    next(err)
  }
}

export async function getListingById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const listing = await listingsService.getListing(req.params.id)
    res.json(listing)
  } catch (err) {
    next(err)
  }
}

export async function createListing(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { title, description, price } = req.body as {
      title?: string
      description?: string
      price?: number
    }

    if (!title || !description || price === undefined || price === null) {
      throw new AppError(400, 'INVALID_INPUT', 'title, description, and price are required.')
    }

    const listing = await listingsService.createListing(req.user!.id, {
      title,
      description,
      price,
    })
    res.status(201).json(listing)
  } catch (err) {
    next(err)
  }
}

export async function updateListing(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { title, description, price } = req.body as {
      title?: string
      description?: string
      price?: number
    }

    const listing = await listingsService.updateListing(req.params.id, req.user!.id, {
      title,
      description,
      price,
    })
    res.json(listing)
  } catch (err) {
    next(err)
  }
}

export async function deleteListing(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await listingsService.deleteListing(req.params.id, req.user!.id)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}
