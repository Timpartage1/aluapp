
"use server";

import { refreshQuotes } from "@/ai/flows/refresh-quotes-flow";
import { QUOTE_DATA } from "@/lib/quotes";

export async function handleRefreshQuotes() {
  try {
    console.log("Starting to refresh quotes...");
    
    // For demonstration, we'll refresh the 'Excellence' category
    const categoryToRefresh = QUOTE_DATA.find(cat => cat.slug === 'excellence');
    
    if (!categoryToRefresh) {
      throw new Error("Category 'Excellence' not found.");
    }
    
    const input = {
      category: categoryToRefresh.title,
      quotes: categoryToRefresh.quotes.map(q => q.text),
    };

    const result = await refreshQuotes(input);
    
    console.log("Refreshed quotes received:", result.refreshedQuotes);

    // Here, you would typically update your Firestore database with the new quotes.
    // For example:
    // const categoryDocRef = doc(db, "categories", "excellence");
    // const updatedQuotes = result.refreshedQuotes.map((text, index) => ({ id: `ex${index + 1}`, text }));
    // await updateDoc(categoryDocRef, { quotes: updatedQuotes });

    return { success: true, data: result.refreshedQuotes };
  } catch (error) {
    console.error("Error refreshing quotes:", error);
    return { success: false, error: "Failed to refresh quotes." };
  }
}

export async function handleFeedbackSubmit(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  console.log('New Feedback Submitted:');
  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Message:', message);

  // Here you would typically send this data to a backend service,
  // an email service, or store it in Firestore.
  // For this example, we'll just log it to the console.

  if (!name || !email || !message) {
    return { success: false, error: 'Please fill out all fields.' };
  }
  
  // Simulate a network request
  await new Promise(resolve => setTimeout(resolve, 1000));

  return { success: true };
}
