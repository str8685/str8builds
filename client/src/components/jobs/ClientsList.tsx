import { FC } from "react";
import { useClients } from "@/hooks/useClients";
import { useProjects } from "@/hooks/useProjects";
import { useInvoices } from "@/hooks/useInvoices";
import { Client, Project, Invoice } from "@shared/schema";

const ClientsList: FC = () => {
  const { clients = [], isLoading, openDetailModal } = useClients();
  const { projects = [] } = useProjects();
  const { invoices = [] } = useInvoices();

  // Explicitly type the arrays
  const typedProjects = projects as Project[];
  const typedInvoices = invoices as Invoice[];
  const typedClients = clients as Client[];

  // Count active projects for a client
  const getActiveProjects = (clientId: number): number => {
    return typedProjects.filter((project) => project.clientId === clientId)
      .length;
  };

  // Count pending invoices for a client
  const getPendingInvoices = (clientId: number): number => {
    return typedInvoices.filter(
      (invoice) => invoice.clientId === clientId && invoice.status !== "paid",
    ).length;
  };

  if (isLoading) {
    return (
      <div className="space-y-3" data-oid=":uwxr4o">
        <div className="flex justify-center p-10" data-oid="ix4r5.p">
          <div
            className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-400"
            data-oid="jdapqkl"
          ></div>
        </div>
      </div>
    );
  }

  // Use typed clients array
  const displayClients = typedClients;

  if (displayClients.length === 0) {
    return (
      <div className="space-y-2" data-oid="is3z0t1">
        <div
          className="p-6 text-center bg-space-800/50 rounded-lg"
          data-oid="u.ho.su"
        >
          <p className="text-gray-400" data-oid="efuhf5o">
            No clients found.
          </p>
          <p className="text-xs text-gray-500 mt-1" data-oid="_h4.1jp">
            Add a new client to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3" data-oid="6p:-1b9">
      {displayClients.map((client: Client) => (
        <div
          key={client.id}
          className="flex justify-between items-center p-3 bg-space-800/50 rounded-lg hover:bg-space-800/80 transition-colors"
          onClick={() => openDetailModal(client)}
          data-oid="bb_j2u-"
        >
          <div className="flex-1" data-oid="3znvvcp">
            <div className="text-sm font-medium text-white" data-oid="emh2q35">
              {client.name}
            </div>
            <div className="text-xs text-gray-400" data-oid="869kru3">
              {getActiveProjects(client.id)} active projects |{" "}
              {getPendingInvoices(client.id)} pending invoices
            </div>
          </div>
          <button
            className="text-xs text-electric hover:text-cyan"
            onClick={(e) => {
              e.stopPropagation();
              openDetailModal(client);
            }}
            data-oid="pxzi_c9"
          >
            <i className="fas fa-chevron-right" data-oid=":7e_iq2"></i>
          </button>
        </div>
      ))}
    </div>
  );
};

export default ClientsList;
