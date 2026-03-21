'use server';

import { z } from 'zod';

const supportFormSchema = z.object({
    email: z.string().email(),
    subject: z.string().min(1, "Subject is required."),
    message: z.string().min(1, "Message is required."),
});

export type SupportFormData = z.infer<typeof supportFormSchema>;

export async function submitSupportRequest(data: SupportFormData) {
    const validatedData = supportFormSchema.safeParse(data);

    if (!validatedData.success) {
        return { success: false, error: "Invalid data provided." };
    }

    const n8nWebhookUrl = process.env.N8N_SUPPORT_WEBHOOK_URL;

    if (!n8nWebhookUrl || n8nWebhookUrl === "your_webhook_url_here") {
        console.warn("n8n webhook URL is not configured. Simulating support request submission.");
        // Simulate success for demo/testing purposes
        return { success: true };
    }

    try {
        const response = await fetch(n8nWebhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(validatedData.data),
        });

        if (!response.ok) {
            console.error("n8n webhook returned an error:", response.statusText);
            return { success: false, error: "Failed to submit support request." };
        }

        console.log("Successfully submitted support request to n8n.");
        return { success: true };
    } catch (error) {
        console.error("Error calling n8n webhook:", error);
        return { success: false, error: "Could not connect to support system." };
    }
}
