export const getEpisodeData = async (epUrl: string) => {
    try {
        const data = await fetch(`${epUrl}`).then((res) => res.json());
        return data;
    }

    catch (error) {
        console.error(error);
    }
};