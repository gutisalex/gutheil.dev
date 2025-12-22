# Resend Setup with Custom Domain

This guide will help you set up Resend with your custom domain (`gutheil.dev`) for sending emails from your contact form.

## Prerequisites

1. A Resend account ([sign up here](https://resend.com))
2. Access to your domain's DNS settings (for `gutheil.dev`)

## Step 1: Get Your Resend API Key

1. Log in to your [Resend dashboard](https://resend.com)
2. Navigate to **API Keys** in the sidebar
3. Click **Create API Key**
4. Give it a name (e.g., "Production" or "Development")
5. Copy the API key (starts with `re_`)
6. **Important**: Save it immediately - you won't be able to see it again!

## Step 2: Add Your Domain to Resend

1. In the Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain: `gutheil.dev` (root domain - recommended)
   - **Why root domain?** You can send from any email address on your domain (e.g., `noreply@gutheil.dev`, `contact@gutheil.dev`)
   - **Alternative:** You can use a subdomain like `mail.gutheil.dev` if you prefer to separate email sending, but this limits you to addresses on that subdomain only
4. Click **Add Domain**

## Step 3: Verify Your Domain

Resend will provide you with DNS records to add to your domain. You need to add these records to your domain's DNS settings. **Important**: Use the exact values provided by Resend in your dashboard, as they are unique to your account.

### Required DNS Records

Resend will show you these records in the dashboard. Here's what to expect:

#### 1. Domain Verification (DKIM) - **REQUIRED**
- **Type**: `TXT`
- **Name**: `resend._domainkey` (or similar subdomain provided by Resend)
- **Content**: A long string starting with `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQ...` (your actual key will be different)
- **TTL**: Auto (or 3600)

#### 2. Enable Sending (SPF) - **REQUIRED**

You'll need to add **two records** for SPF:

**a) MX Record:**
- **Type**: `MX`
- **Name**: `send` (creates a subdomain `send.gutheil.dev`)
- **Content/Value**: `feedback-smtp.eu-west-1.amazonses.com` (or similar based on your region)
- **Priority**: `10`
- **TTL**: Auto

**b) TXT Record:**
- **Type**: `TXT`
- **Name**: `send` (same subdomain)
- **Content**: `v=spf1 include:amazonses.com ~all`
- **TTL**: Auto

#### 3. DMARC Record - **OPTIONAL but Recommended**
- **Type**: `TXT`
- **Name**: `_dmarc`
- **Content**: `v=DMARC1; p=none;` (you can add `rua=mailto:dmarc@gutheil.dev` if you want reports)
- **TTL**: Auto

#### 4. Enable Receiving (MX) - **OPTIONAL**

Only add this if you want to receive emails at addresses on your domain:

- **Type**: `MX`
- **Name**: `@` (root domain)
- **Content/Value**: `inbound-smtp.eu-west-1.amazonaws.com` (or similar based on your region)
- **Priority**: `9`
- **TTL**: Auto

**Note**: For a contact form that only sends emails (doesn't receive), you can skip the "Enable Receiving" MX record.

### How to Add DNS Records

The process depends on your domain registrar/DNS provider:

**Common Providers:**
- **Cloudflare**: DNS → Records → Add record
- **Namecheap**: Advanced DNS → Add new record
- **GoDaddy**: DNS Management → Add
- **Google Domains**: DNS → Custom records

**Steps:**
1. Log in to your domain registrar/DNS provider
2. Find DNS/Domain settings
3. Add each record **exactly as shown in Resend dashboard**:
   - Copy the **Type**, **Name**, **Content**, and **Priority** (for MX records) exactly
   - Make sure the **Name** field matches exactly (e.g., `resend._domainkey`, `send`, `_dmarc`, `@`)
4. Save the changes
5. Wait for DNS propagation (usually 5-30 minutes, can take up to 48 hours)

**Important Notes:**
- The `send` subdomain in the SPF records is created automatically when you add those records - you don't need to create the subdomain separately
- For the `@` symbol in MX records, some providers use `@`, others use your root domain name (e.g., `gutheil.dev`) - check your provider's documentation
- Copy the exact values from Resend - they are unique to your account and region

### Verify Domain Status

1. Return to Resend dashboard → Domains
2. Wait a few minutes for DNS propagation (can take up to 48 hours, usually much faster)
3. The domain status should change from "Pending" to "Verified" (green checkmark)

## Step 4: Configure Environment Variables

### Local Development

Create a `.env.local` file in the root of your project:

```bash
# Required: Your Resend API key
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Required: Where contact form submissions should be sent
CONTACT_EMAIL=your-email@example.com

# Optional: Custom "from" email (must be from verified domain)
# Use your custom domain once verified:
RESEND_FROM_EMAIL=Contact Form <noreply@gutheil.dev>
```

### Production (Vercel)

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:
   - `RESEND_API_KEY` = your API key
   - `CONTACT_EMAIL` = your email address
   - `RESEND_FROM_EMAIL` = `Contact Form <noreply@gutheil.dev>` (or your preferred email)

**Important**: Make sure to add these for the **Production** environment (and optionally Preview/Development if needed).

## Step 5: Test Your Setup

### Test Locally

1. Start your development server:
   ```bash
   bun run dev
   ```

2. Navigate to your contact form
3. Submit a test message
4. Check your email inbox (the `CONTACT_EMAIL` address)

### Test in Production

1. Deploy to Vercel (or your hosting platform)
2. Submit a test message through the contact form
3. Verify you receive the email

## Troubleshooting

### Domain Not Verifying

- **Wait longer**: DNS changes can take up to 48 hours (usually 5-30 minutes)
- **Check DNS records**: Verify all records are added correctly
- **Use DNS checker**: Use tools like [MXToolbox](https://mxtoolbox.com) to verify your DNS records
- **Check for typos**: Ensure domain name and record values are correct

### Emails Not Sending

- **Check API key**: Verify `RESEND_API_KEY` is set correctly
- **Check domain status**: Ensure domain shows as "Verified" in Resend dashboard
- **Check from email**: The `from` email must be from your verified domain
- **Check Resend logs**: Go to Resend dashboard → Logs to see error messages
- **Check spam folder**: Sometimes emails end up in spam initially

### Using Test Domain (Development)

If your domain isn't verified yet, you can use Resend's test domain:
- `RESEND_FROM_EMAIL=Contact Form <onboarding@resend.dev>`

**Note**: Emails from `onboarding@resend.dev` will only work for the first 100 emails and are for testing only.

## Best Practices

1. **Use a subdomain for sending**: Consider using `noreply@gutheil.dev` or `contact@gutheil.dev` instead of your main email
2. **Set up DMARC**: Helps prevent email spoofing and improves deliverability
3. **Monitor Resend logs**: Check the Resend dashboard regularly for delivery issues
4. **Use environment-specific emails**: Use different `CONTACT_EMAIL` for development vs production
5. **Rate limiting**: The contact form already has rate limiting built in (5 requests per minute)

## Email Address Options

Once your domain is verified, you can use any email address from your domain:

- `noreply@gutheil.dev` - For automated emails (no replies expected) ⭐ **Recommended for contact forms**
- `contact@gutheil.dev` - For contact form submissions
- `hello@gutheil.dev` - For general inquiries
- `info@gutheil.dev` - For information requests

**Note:** If you added a subdomain (e.g., `mail.gutheil.dev`), you can only use addresses on that subdomain (e.g., `noreply@mail.gutheil.dev`). Using the root domain gives you more flexibility.

Choose the one that best fits your use case!

## Additional Resources

- [Resend Documentation](https://resend.com/docs)
- [Resend Domain Setup Guide](https://resend.com/docs/dashboard/domains/introduction)
- [DNS Record Types Explained](https://www.cloudflare.com/learning/dns/dns-records/)

