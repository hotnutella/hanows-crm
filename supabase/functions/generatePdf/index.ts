import { corsHeaders } from '../_shared/cors.ts';
import { renderLayout } from './layout.ts';

Deno.serve(async (request: Request): Promise<Response> => {
  // Set up CORS headers
  const headers = {
    ...corsHeaders,
    'Content-Type': 'application/json'
  };

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (request.method === 'OPTIONS') {
    // Handle CORS preflight request
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  try {
    // Process POST request to generate and upload PDF
    if (request.method === 'POST') {
      const requestData = await request.json();
      const { accountData, invoice, invoiceLines, client, bank } = requestData;

      // Create a unique name for the PDF file
      const fileName = `${accountData.user_id}${invoice.invoice_number}.pdf`;
      const fileUrl = `${SUPABASE_URL}/storage/v1/object/invoice-pdfs/${fileName}`;

      await fetch(fileUrl, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          'apiKey': `${SUPABASE_SERVICE_ROLE_KEY}`
        }
      });

      const pdfDoc = await renderLayout(invoice, invoiceLines, client, accountData, bank);
      const pdfBytes = await pdfDoc.save();

      // Upload the PDF to Supabase Storage using fetch API
      const formData = new FormData();
      formData.append("file", new Blob([pdfBytes], { type: "application/pdf" }), fileName);

      const storageData = await fetch(fileUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          'apiKey': `${SUPABASE_SERVICE_ROLE_KEY}`
        },
        body: formData
      });

      const data = await storageData.json();
      if (!storageData.ok) {
        console.log(storageData);
        throw new Error(data.error.message || 'Failed to upload PDF');
      }

      // Update the invoice table
      const updateResponse = await fetch(`${SUPABASE_URL}/rest/v1/invoices?id=eq.${invoice.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          'apiKey': `${SUPABASE_SERVICE_ROLE_KEY}`,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({
          additional_info: { pdf_url: `${SUPABASE_URL}/storage/v1/object/public/invoice-pdfs/${fileName}` }
        })
      });

      const updateData = await updateResponse.json();
      if (!updateResponse.ok) {
        throw new Error(updateData.error.message || 'Failed to update invoice');
      }

      // Respond with the URL of the uploaded PDF
      return new Response(JSON.stringify({
        data: data,
        fileName: fileName,
        url: `${SUPABASE_URL}/storage/v1/object/invoice-pdfs/${fileName}`
      }), {
        status: 200,
        headers: headers
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: headers
    });
  }

  // If method is not OPTIONS or POST, return method not allowed
  return new Response('Method not allowed', { status: 405, headers: headers });
});
