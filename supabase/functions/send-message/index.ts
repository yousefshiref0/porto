import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json',
}

// Email service - using a basic implementation
// In production, you'd use SendGrid, Resend, or similar
async function sendEmail(to: string, subject: string, html: string) {
  // For now, we'll just log it
  // In production, integrate with an email service
  console.log(`Email to ${to}: ${subject}`)
  return true
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { name, email, subject, message } = await req.json()

    // Validate inputs
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: corsHeaders }
      )
    }

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    // Save message to database
    const { data: savedMessage, error: saveError } = await supabaseClient
      .from('messages')
      .insert([
        {
          name,
          email,
          subject,
          message,
          is_read: false,
        }
      ])
      .select()
      .single()

    if (saveError) {
      throw saveError
    }

    // Send confirmation email to user
    const userEmailHtml = `
      <h2>Thank you for your message!</h2>
      <p>Hi ${name},</p>
      <p>I received your message and will get back to you soon.</p>
      <br>
      <p>Best regards,<br>Yousef</p>
    `

    // Send notification email to admin
    const adminEmailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `

    // Try to send emails (non-critical, so don't throw)
    try {
      await sendEmail(email, 'We received your message', userEmailHtml)
      await sendEmail('yousefshirefbusiness@gmail.com', `New Contact: ${subject}`, adminEmailHtml)
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Message saved successfully',
        data: savedMessage
      }),
      { status: 200, headers: corsHeaders }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({
        error: error.message || 'Internal server error'
      }),
      { status: 500, headers: corsHeaders }
    )
  }
})
