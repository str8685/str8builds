import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { Invoice, TimeEntry, Client, Project } from '@shared/schema';
import { format } from 'date-fns';

/**
 * Generate a PDF from an HTML element
 * @param element HTML element to convert to PDF
 * @param filename Filename for the PDF
 * @param options Additional options
 * @returns Promise that resolves with the PDF as a Blob
 */
export async function generatePdfFromElement(
  element: HTMLElement,
  filename: string,
  options: {
    format?: 'a4' | 'letter';
    orientation?: 'portrait' | 'landscape';
    margin?: number;
    scale?: number;
  } = {}
): Promise<Blob> {
  const {
    format = 'a4',
    orientation = 'portrait',
    margin = 10,
    scale = 2,
  } = options;

  // Create a canvas from the element
  const canvas = await html2canvas(element, {
    scale: scale,
    useCORS: true,
    logging: false,
    allowTaint: true,
  });

  // Create a PDF with the appropriate dimensions
  const pdf = new jsPDF({
    orientation,
    unit: 'mm',
    format,
  });

  // Calculate dimensions
  const imgWidth = pdf.internal.pageSize.getWidth() - margin * 2;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  // Add the image to the PDF
  const imgData = canvas.toDataURL('image/png');
  pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight);

  // Return the PDF as a blob
  return pdf.output('blob');
}

/**
 * Save a PDF to the user's device
 * @param blob PDF blob
 * @param filename Filename for the PDF
 */
export function savePdf(blob: Blob, filename: string): void {
  saveAs(blob, filename);
}

/**
 * Generate an invoice PDF
 * @param invoice Invoice data
 * @param client Client data
 * @param items Invoice items
 * @returns Promise that resolves with the PDF as a Blob
 */
export async function generateInvoicePdf(
  invoice: Invoice,
  client: Client,
  items: any[]
): Promise<Blob> {
  // Create a temporary div to render the invoice
  const tempDiv = document.createElement('div');
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  tempDiv.style.top = '-9999px';
  tempDiv.style.width = '210mm'; // A4 width
  document.body.appendChild(tempDiv);

  // Format the invoice date
  const invoiceDate = invoice.createdAt 
    ? format(new Date(invoice.createdAt), 'dd/MM/yyyy')
    : 'N/A';
  
  // Format the due date
  const dueDate = invoice.dueDate
    ? format(new Date(invoice.dueDate), 'dd/MM/yyyy')
    : 'N/A';

  // Create the invoice HTML
  tempDiv.innerHTML = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
        <div>
          <h1 style="color: #0ca5e9; margin: 0;">INVOICE</h1>
          <p style="margin: 5px 0;">STR8 BUILD Construction</p>
          <p style="margin: 5px 0;">123 Builder Street</p>
          <p style="margin: 5px 0;">Auckland, New Zealand</p>
          <p style="margin: 5px 0;">info@str8build.co.nz</p>
        </div>
        <div style="text-align: right;">
          <h2 style="margin: 0; color: #0ca5e9;">Invoice #${invoice.invoiceNumber}</h2>
          <p style="margin: 5px 0;"><strong>Date:</strong> ${invoiceDate}</p>
          <p style="margin: 5px 0;"><strong>Due Date:</strong> ${dueDate}</p>
          <p style="margin: 5px 0;"><strong>Status:</strong> ${invoice.status || 'Pending'}</p>
        </div>
      </div>

      <div style="margin-bottom: 30px;">
        <h3 style="margin: 0; color: #0ca5e9;">Bill To:</h3>
        <p style="margin: 5px 0;"><strong>${client.name}</strong></p>
        <p style="margin: 5px 0;">${client.address || 'No address provided'}</p>
        <p style="margin: 5px 0;">${client.email || 'No email provided'}</p>
        <p style="margin: 5px 0;">${client.phone || 'No phone provided'}</p>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
        <thead>
          <tr style="background-color: #f3f4f6;">
            <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Description</th>
            <th style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">Quantity</th>
            <th style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">Rate</th>
            <th style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${items.map(item => `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.description}</td>
              <td style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">${item.quantity}</td>
              <td style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">$${parseFloat(item.rate).toFixed(2)}</td>
              <td style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">$${parseFloat(item.amount).toFixed(2)}</td>
            </tr>
          `).join('')}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;"><strong>Subtotal:</strong></td>
            <td style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">$${parseFloat(invoice.subtotal?.toString() || '0').toFixed(2)}</td>
          </tr>
          <tr>
            <td colspan="3" style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;"><strong>Tax (15%):</strong></td>
            <td style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">$${parseFloat(invoice.tax?.toString() || '0').toFixed(2)}</td>
          </tr>
          <tr>
            <td colspan="3" style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;"><strong>Total:</strong></td>
            <td style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd; font-weight: bold; color: #0ca5e9;">$${parseFloat(invoice.total?.toString() || '0').toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>

      <div style="margin-bottom: 30px;">
        <h3 style="margin: 0; color: #0ca5e9;">Payment Details:</h3>
        <p style="margin: 5px 0;"><strong>Bank:</strong> ANZ Bank New Zealand</p>
        <p style="margin: 5px 0;"><strong>Account Name:</strong> STR8 BUILD Construction</p>
        <p style="margin: 5px 0;"><strong>Account Number:</strong> 01-1234-5678910-00</p>
        <p style="margin: 5px 0;"><strong>Reference:</strong> Invoice #${invoice.invoiceNumber}</p>
      </div>

      <div style="margin-top: 50px; text-align: center; color: #666; font-size: 12px;">
        <p>Thank you for your business!</p>
        <p>If you have any questions about this invoice, please contact us at accounts@str8build.co.nz</p>
      </div>
    </div>
  `;

  try {
    // Generate the PDF
    const blob = await generatePdfFromElement(tempDiv, `Invoice-${invoice.invoiceNumber}.pdf`);
    
    // Clean up
    document.body.removeChild(tempDiv);
    
    return blob;
  } catch (error) {
    // Clean up on error
    if (document.body.contains(tempDiv)) {
      document.body.removeChild(tempDiv);
    }
    throw error;
  }
}

/**
 * Generate a timesheet PDF
 * @param timeEntries Time entries
 * @param projects Projects
 * @param period Period string (e.g., "June 2023")
 * @returns Promise that resolves with the PDF as a Blob
 */
export async function generateTimesheetPdf(
  timeEntries: TimeEntry[],
  projects: Project[],
  period: string
): Promise<Blob> {
  // Create a temporary div to render the timesheet
  const tempDiv = document.createElement('div');
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  tempDiv.style.top = '-9999px';
  tempDiv.style.width = '210mm'; // A4 width
  document.body.appendChild(tempDiv);

  // Calculate total hours and amount
  let totalHours = 0;
  let totalAmount = 0;

  timeEntries.forEach(entry => {
    const hours = entry.duration ? entry.duration / 3600 : 0; // Convert seconds to hours
    totalHours += hours;
    
    const rate = entry.hourlyRate ? parseFloat(entry.hourlyRate.toString()) : 0;
    totalAmount += hours * rate;
  });

  // Create the timesheet HTML
  tempDiv.innerHTML = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
        <div>
          <h1 style="color: #0ca5e9; margin: 0;">TIMESHEET</h1>
          <p style="margin: 5px 0;">STR8 BUILD Construction</p>
          <p style="margin: 5px 0;">123 Builder Street</p>
          <p style="margin: 5px 0;">Auckland, New Zealand</p>
        </div>
        <div style="text-align: right;">
          <h2 style="margin: 0; color: #0ca5e9;">Period: ${period}</h2>
          <p style="margin: 5px 0;"><strong>Date Generated:</strong> ${format(new Date(), 'dd/MM/yyyy')}</p>
        </div>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
        <thead>
          <tr style="background-color: #f3f4f6;">
            <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Date</th>
            <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Project</th>
            <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Description</th>
            <th style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">Hours</th>
            <th style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">Rate</th>
            <th style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${timeEntries.map(entry => {
            const project = projects.find(p => p.id === entry.projectId);
            const hours = entry.duration ? entry.duration / 3600 : 0; // Convert seconds to hours
            const rate = entry.hourlyRate ? parseFloat(entry.hourlyRate.toString()) : 0;
            const amount = hours * rate;
            
            return `
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${format(new Date(entry.startTime), 'dd/MM/yyyy')}</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${project ? project.name : 'Unknown Project'}</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${entry.notes || 'No description'}</td>
                <td style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">${hours.toFixed(2)}</td>
                <td style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">$${rate.toFixed(2)}</td>
                <td style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">$${amount.toFixed(2)}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;"><strong>Total:</strong></td>
            <td style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;"><strong>${totalHours.toFixed(2)}</strong></td>
            <td style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;"></td>
            <td style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd; font-weight: bold; color: #0ca5e9;">$${totalAmount.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>

      <div style="margin-top: 50px; text-align: center; color: #666; font-size: 12px;">
        <p>Generated by STR8 BUILD Construction</p>
      </div>
    </div>
  `;

  try {
    // Generate the PDF
    const blob = await generatePdfFromElement(tempDiv, `Timesheet-${period.replace(/\s/g, '-')}.pdf`);
    
    // Clean up
    document.body.removeChild(tempDiv);
    
    return blob;
  } catch (error) {
    // Clean up on error
    if (document.body.contains(tempDiv)) {
      document.body.removeChild(tempDiv);
    }
    throw error;
  }
}
