import { saveAs } from 'file-saver';
import { Invoice, TimeEntry, Client, Project } from '@shared/schema';
import { format } from 'date-fns';

/**
 * Convert an array of objects to CSV
 * @param data Array of objects to convert
 * @param headers Object mapping column keys to header names
 * @returns CSV string
 */
export function objectsToCSV(
  data: Record<string, any>[],
  headers: Record<string, string>
): string {
  // Create header row
  const headerRow = Object.values(headers).join(',');
  
  // Create data rows
  const rows = data.map(item => {
    return Object.keys(headers)
      .map(key => {
        // Get the value and handle special cases
        let value = item[key];
        
        // Format dates
        if (value instanceof Date) {
          value = format(value, 'yyyy-MM-dd');
        }
        
        // Handle undefined or null
        if (value === undefined || value === null) {
          value = '';
        }
        
        // Convert to string and escape commas and quotes
        const stringValue = String(value);
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        
        return stringValue;
      })
      .join(',');
  });
  
  // Combine header and rows
  return [headerRow, ...rows].join('\n');
}

/**
 * Save CSV data to a file
 * @param csvData CSV string
 * @param filename Filename for the CSV
 */
export function saveCSV(csvData: string, filename: string): void {
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, filename);
}

/**
 * Generate a CSV file from invoice data
 * @param invoice Invoice data
 * @param client Client data
 * @param items Invoice items
 */
export function generateInvoiceCSV(
  invoice: Invoice,
  client: Client,
  items: any[]
): string {
  // Create invoice summary
  const invoiceSummary = {
    invoiceNumber: invoice.invoiceNumber,
    date: format(new Date(invoice.createdAt || new Date()), 'yyyy-MM-dd'),
    dueDate: invoice.dueDate ? format(new Date(invoice.dueDate), 'yyyy-MM-dd') : '',
    clientName: client.name,
    clientEmail: client.email,
    subtotal: invoice.subtotal,
    tax: invoice.tax,
    total: invoice.total,
    status: invoice.status || 'Pending'
  };
  
  // Create invoice summary CSV
  const invoiceSummaryCSV = objectsToCSV([invoiceSummary], {
    invoiceNumber: 'Invoice Number',
    date: 'Date',
    dueDate: 'Due Date',
    clientName: 'Client Name',
    clientEmail: 'Client Email',
    subtotal: 'Subtotal',
    tax: 'Tax',
    total: 'Total',
    status: 'Status'
  });
  
  // Create items CSV
  const itemsCSV = objectsToCSV(items, {
    description: 'Description',
    quantity: 'Quantity',
    rate: 'Rate',
    amount: 'Amount'
  });
  
  // Combine the two CSVs
  return `INVOICE SUMMARY\n${invoiceSummaryCSV}\n\nINVOICE ITEMS\n${itemsCSV}`;
}

/**
 * Generate a CSV file from timesheet data
 * @param timeEntries Time entries
 * @param projects Projects
 * @param period Period string (e.g., "June 2023")
 */
export function generateTimesheetCSV(
  timeEntries: TimeEntry[],
  projects: Project[],
  period: string
): string {
  // Prepare data for CSV
  const data = timeEntries.map(entry => {
    const project = projects.find(p => p.id === entry.projectId);
    const hours = entry.duration ? entry.duration / 3600 : 0; // Convert seconds to hours
    const rate = entry.hourlyRate ? parseFloat(entry.hourlyRate.toString()) : 0;
    const amount = hours * rate;
    
    return {
      date: format(new Date(entry.startTime), 'yyyy-MM-dd'),
      project: project ? project.name : 'Unknown Project',
      description: entry.notes || 'No description',
      hours: hours.toFixed(2),
      rate: rate.toFixed(2),
      amount: amount.toFixed(2)
    };
  });
  
  // Calculate totals
  const totalHours = timeEntries.reduce((sum, entry) => {
    return sum + (entry.duration ? entry.duration / 3600 : 0);
  }, 0);
  
  const totalAmount = timeEntries.reduce((sum, entry) => {
    const hours = entry.duration ? entry.duration / 3600 : 0;
    const rate = entry.hourlyRate ? parseFloat(entry.hourlyRate.toString()) : 0;
    return sum + (hours * rate);
  }, 0);
  
  // Create CSV
  const entriesCSV = objectsToCSV(data, {
    date: 'Date',
    project: 'Project',
    description: 'Description',
    hours: 'Hours',
    rate: 'Rate',
    amount: 'Amount'
  });
  
  // Add summary
  const summary = `TIMESHEET SUMMARY\nPeriod,${period}\nTotal Hours,${totalHours.toFixed(2)}\nTotal Amount,$${totalAmount.toFixed(2)}\n\nTIME ENTRIES\n`;
  
  return summary + entriesCSV;
}
