import { Metadata } from "../../shared/interfaces/transaction/metadata.interface";

interface CreateOrUpdateTransactionMetadataArgTypes {
    prevEntry: Metadata;
    newEntry: Metadata;
    idx: number;
    data: Metadata[];
    create: any;
    update: any;
    setData: any;
};

export const createOrUpdateTransactionMetadata = ({
    prevEntry,
    newEntry,
    idx,
    data,
    create,
    update,
    setData,
}: CreateOrUpdateTransactionMetadataArgTypes) => {
    const { from, to, summary, location } = prevEntry;
    const isNewEntry: boolean = !(from || to || summary || location);

    if (!isNewEntry) {
        update({
            variables: newEntry
        }).then((response: any) => {
            const {
                address,
                txnHash,
                from,
                to,
                summary,
                location
            } = response.data.updateTransaction.transaction;
            data[idx] = {
                address,
                txnHash,
                from,
                to,
                summary,
                location
            }
            setData(data)
        })         
        return;
    }

    create({
        variables: newEntry
    }).then((response: { data: { addTransaction: { transaction: Metadata; }; }; }) => {
        const {
            address,
            txnHash,
            from,
            to,
            summary,
            location
        } = response.data.addTransaction.transaction;
        data[idx] = {
            address,
            txnHash,
            from,
            to,
            summary,
            location
        }
        setData(data)
    });
}
