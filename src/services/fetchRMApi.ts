export const getRMData = async (characterAmount: number[]) => {
    try {
        const data = await fetch(`https://rickandmortyapi.com/api/character/${characterAmount}`).then((res) => res.json());
        return data;
    }

    catch (error) {
        console.error(error);
    }
};