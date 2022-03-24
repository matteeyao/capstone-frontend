import useAxios from "../hooks/useAxios";

interface Props {
  account: any;
}

function Transactions({ account }: Props) {
    const { response, loading, error } = useAxios({
        method: "get",
        url: `/api?module=account&action=txlist&address=${account}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=4YT69IDTQ4BWK3QRH24AGQ4YHSC28Q1AYV`,
        headers: {
            accept: '*/*',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    console.log(response);

    return (
        <div className="mx-auto">
            {loading && (
                <p>Loading...</p>
            )}
            {error && (
                <p>{error.message}</p>
            )}
            {!loading && !error && (
                <article className="post">
                <p className="post-body">
                    {response?.data.result.join(", ")}
                </p>
                </article>
            )}
        </div>
    );
}

export default Transactions;
