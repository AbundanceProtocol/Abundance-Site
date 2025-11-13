import { NextRequest, NextResponse } from 'next/server'
import connectToDatabase from '@/libs/mongodb'
import Subscriber from '@/models/Subscriber'

async function fetchWalletAddress(fid: number): Promise<string> {
  try {
    const response = await fetch(`https://client.warpcast.com/v2/user-by-fid?fid=${fid}`)
    
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    
    const data = await response.json()
    const wallets = data?.result?.extras?.walletLabels
    
    if (!wallets || !Array.isArray(wallets)) {
      return ''
    }
    
    // First try to find wallet with 'warpcast' label
    let warpcastWallet = wallets.find(
      (wallet: any) => wallet.address?.startsWith('0x') && wallet.labels?.includes('warpcast')
    )
    
    // If not found, try to find wallet with 'primary' label
    if (!warpcastWallet) {
      warpcastWallet = wallets.find(
        (wallet: any) => wallet.address?.startsWith('0x') && wallet.labels?.includes('primary')
      )
    }
    
    return warpcastWallet?.address || ''
  } catch (error) {
    console.error('Error fetching wallet address:', error)
    return ''
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, fid, username } = body

    // Validate email format - requires valid domain with at least 2 characters TLD
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    const trimmedEmail = email.trim()

    // If fid is not null, save to MongoDB
    if (fid !== null && fid !== undefined) {
      try {
        await connectToDatabase()
        
        // Fetch wallet address from Warpcast
        const walletAddress = await fetchWalletAddress(Number(fid))
        
        // Check if subscriber already exists
        const existingSubscriber = await Subscriber.findOne({ fid })
        
        if (existingSubscriber) {
          // Update existing subscriber with email and wallet if not already set
          let updated = false
          if (!existingSubscriber.email) {
            existingSubscriber.email = trimmedEmail
            updated = true
          }
          if (!existingSubscriber.wallet && walletAddress) {
            existingSubscriber.wallet = walletAddress
            updated = true
          }
          if (updated) {
            await existingSubscriber.save()
          }
        } else {
          // Create new subscriber
          if (!username) {
            return NextResponse.json(
              { error: 'Username is required when fid is provided' },
              { status: 400 }
            )
          }
          
          await Subscriber.create({
            fid: Number(fid),
            username: username,
            email: trimmedEmail,
            wallet: walletAddress || undefined,
          })
        }
      } catch (dbError) {
        console.error('Error saving to MongoDB:', dbError)
        return NextResponse.json(
          { error: 'Failed to save subscriber information' },
          { status: 500 }
        )
      }
    }

    // Return success - Substack subscription will be handled client-side
    // (Substack blocks server-side requests with 403, so we submit from browser)
    return NextResponse.json({ 
      success: true, 
      email: trimmedEmail,
      message: 'Subscriber information saved. Subscribing to Substack...' 
    })
  } catch (error) {
    console.error('Error subscribing:', error)
    return NextResponse.json(
      { error: 'An error occurred while subscribing' },
      { status: 500 }
    )
  }
}