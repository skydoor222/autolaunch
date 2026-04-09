import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { LaunchFormData, GeneratedPost, PlatformName } from '@/types'

const PLATFORM_SYSTEM_PROMPTS: Record<PlatformName, string> = {
  x: `あなたはProduct Huntで1000upvotesを獲得したことのあるソロビルダーです。以下のサービス情報から、Xで最大のエンゲージメントを得られるツイートを書いてください。・フック（最初の一文で止まらせる）を必ず入れる・絵文字は3個以内・CTAは最後の1行のみ・ハッシュタグは2個以内。Return ONLY the tweet text, nothing else.`,
  producthunt: `You are an experienced Product Hunt launcher who has achieved #1 Product of the Day multiple times. Generate a compelling Product Hunt post in JSON format with fields: "title" (product name, max 60 chars), "tagline" (one punchy line, max 60 chars), "description" (engaging launch description, 3-4 paragraphs). Return ONLY valid JSON.`,
  hackernews: `You are a senior engineer who regularly posts successful "Show HN" submissions. Generate a Hacker News "Show HN:" post. Format: first line is the title starting with "Show HN: ", followed by a blank line, then a technical but accessible description (2-3 paragraphs, no hype, focus on what it does and how). Return ONLY the post text.`,
  reddit: `You are an indie developer sharing your project on r/SideProject. Write a casual, authentic Reddit post. Include: engaging title, personal journey context, what the product does, honest reflection on building it, and a question to spark discussion. No excessive self-promotion. Return ONLY the post text with title on first line.`,
  indiehackers: `You are an indie hacker sharing a milestone on Indie Hackers. Write in the authentic IH format: share the journey, the numbers, lessons learned, what's next. Be honest about struggles and wins. Include specific metrics or milestones. Return ONLY the post text.`,
}

async function generateForPlatform(
  client: Anthropic,
  platform: PlatformName,
  formData: LaunchFormData
): Promise<GeneratedPost> {
  const userPrompt = `Service Name: ${formData.serviceName}
URL: ${formData.serviceUrl}
One-liner: ${formData.oneLiner}
Description: ${formData.description}
Target Users: ${formData.targetUsers}
Key Features: ${formData.keyFeatures.filter(Boolean).join(', ')}
Tags: ${formData.tags.join(', ')}`

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: PLATFORM_SYSTEM_PROMPTS[platform],
    messages: [{ role: 'user', content: userPrompt }],
  })

  const rawText = response.content[0].type === 'text' ? response.content[0].text : ''

  if (platform === 'producthunt') {
    try {
      // Extract JSON even if wrapped in markdown
      const jsonMatch = rawText.match(/\{[\s\S]*\}/)
      const json = jsonMatch ? JSON.parse(jsonMatch[0]) : {}
      return {
        platform,
        content: json.description || rawText,
        title: json.title || formData.serviceName,
        tagline: json.tagline || formData.oneLiner,
      }
    } catch {
      return { platform, content: rawText, title: formData.serviceName, tagline: formData.oneLiner }
    }
  }

  return { platform, content: rawText }
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY

  if (!apiKey) {
    // Return mock generated posts when no API key
    const body = await req.json() as { formData: LaunchFormData }
    const { formData } = body
    const mockPosts: GeneratedPost[] = [
      {
        platform: 'x',
        content: `I just launched ${formData.serviceName} 🚀\n\n${formData.oneLiner}\n\nBuilt this because I was tired of [the problem it solves]. After 3 months of building solo, it's finally live.\n\nTry it free: ${formData.serviceUrl}\n\n#indiehacker #buildinpublic`,
      },
      {
        platform: 'producthunt',
        content: `We built ${formData.serviceName} because we kept running into this problem ourselves. ${formData.description}\n\nWe'd love your feedback and support! This has been a labor of love and we're excited to share it with the Product Hunt community.`,
        title: formData.serviceName,
        tagline: formData.oneLiner,
      },
      {
        platform: 'hackernews',
        content: `Show HN: ${formData.serviceName} – ${formData.oneLiner}\n\n${formData.description}\n\nWe built this after struggling with the existing solutions. The core technology uses [approach]. It's currently in beta at ${formData.serviceUrl}.\n\nWould love to hear feedback from HN, especially around edge cases and scalability concerns.`,
      },
      {
        platform: 'reddit',
        content: `I built ${formData.serviceName} – ${formData.oneLiner}\n\nHey r/SideProject! After a few months of nights and weekends, I finally launched my side project.\n\n**What it does:** ${formData.description}\n\n**Target users:** ${formData.targetUsers}\n\n**Key features:**\n${formData.keyFeatures.filter(Boolean).map((f) => `- ${f}`).join('\n')}\n\nCheck it out: ${formData.serviceUrl}\n\nWhat do you think? Any feedback welcome!`,
      },
      {
        platform: 'indiehackers',
        content: `Milestone: Launched ${formData.serviceName} to the public!\n\nAfter months of building, I finally hit publish on ${formData.serviceName}.\n\n**What I built:** ${formData.description}\n\n**For whom:** ${formData.targetUsers}\n\n**Lessons learned:**\n- Ship early, iterate fast\n- Talk to users before building features\n- Distribution is harder than building\n\n**What's next:** Focusing on getting first 100 users and collecting feedback.\n\nLink: ${formData.serviceUrl}`,
      },
    ]
    return NextResponse.json({ posts: mockPosts })
  }

  try {
    const body = await req.json() as { formData: LaunchFormData; platforms?: PlatformName[] }
    const { formData, platforms = ['x', 'producthunt', 'hackernews', 'reddit', 'indiehackers'] } = body

    const client = new Anthropic({ apiKey })

    const results = await Promise.allSettled(
      platforms.map((p) => generateForPlatform(client, p, formData))
    )

    const posts: GeneratedPost[] = results.map((result, i) => {
      if (result.status === 'fulfilled') return result.value
      return {
        platform: platforms[i],
        content: `Failed to generate content for ${platforms[i]}: ${result.reason}`,
      }
    })

    return NextResponse.json({ posts })
  } catch (err) {
    console.error('Generate error:', err)
    return NextResponse.json({ error: 'Failed to generate posts' }, { status: 500 })
  }
}
