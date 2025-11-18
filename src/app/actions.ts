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
