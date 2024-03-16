import React, { useState, useEffect } from "react";
import List from "./List";
import Pagination from "./Pagination";
import Header from "./Header";
import { VStack, Spinner, Flex } from "@chakra-ui/react";

const CardList = () => {
  const originalAPIKey = "https://swapi.dev/api/people/?page=";
  const [data, setData] = useState([]);
  const [searchField, setSearchField] = useState();
  const [errorLoading, setErrorLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [loading, setLoading] = useState(true);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [apiKey, setApiKey] = useState(`${originalAPIKey}${currentPage + 1}`);
  const [paginatedData, setPaginatedData] = useState([]);
  const [animalImages, setAnimalImages] = useState();
  const [homeWorldNames, setHomeWorldNames] = useState();
  const [selectedHomeWorld, setSelectedHomeWorld] = useState();

  useEffect(() => {
    //console.log(searchField);
    fetchData();
    handleFilters();
    //console.log(searchField);
    //console.log("b");
  }, [apiKey, currentPage]);

  useEffect(() => {
    handleFilters();
  }, [searchField, selectedHomeWorld]);

  const handleFilters = () => {
    let filteredData = data;
    if (searchField) {
      filteredData = data.filter((currData) => {
        return currData.name.toLowerCase().includes(searchField.toLowerCase());
      });
    }
    if (selectedHomeWorld) {
      filteredData = data.filter((currData) => {
        return currData.homeWorldName
          .toLowerCase()
          .includes(selectedHomeWorld.toLowerCase());
      });
    }

    if (searchField || selectedHomeWorld) {
      setPaginatedData(filteredData);
      setCurrentPage(1);
      setNumberOfPages(Math.ceil(filteredData.length / itemsPerPage));
    } else {
      setPaginatedData(
        data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
      );
      setNumberOfPages(Math.ceil(data.length / itemsPerPage));
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(apiKey);
      const result = await response.json();

      const images = await Promise.all(
        result.results.map(async (animal) => {
          const response = await fetch(
            `https://source.unsplash.com/random?${animal.eye_color}-animal`
          );
          return response.url;
        })
      );

      const homeWorldNames = await Promise.all(
        result.results.map(async (animal) => {
          const response = await fetch(animal.homeworld);
          const responseData = await response.json();
          return responseData.name;
        })
      );

      //console.log(homeWorldNames);
      setHomeWorldNames(homeWorldNames);

      const modData = result.results;
      modData.forEach((char, i) => {
        char.homeWorldName = homeWorldNames[i];
      });
      //console.log(modData);
      //console.log(result);
      setData(modData);
      setLoading(false);
      setNumberOfPages(Math.ceil(modData.length / itemsPerPage));
      setPaginatedData(
        modData.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      );

      setAnimalImages(images);
      //console.log(images);
      setErrorLoading(false);
    } catch (error) {
      //console.error("Error fetching data:", error);
      setLoading(false);
      setErrorLoading(true);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setApiKey(`${originalAPIKey}${currentPage + 1}`);
  };

  return (
    <div className="container" style={{ backgroundColor: "aquamarine" }}>
      {loading ? (
        <Flex justify="center" align="center" h="75vh">
          <Spinner size="xl" />
        </Flex>
      ) : !errorLoading && !loading ? (
        <VStack spacing={5}>
          <Header
            setSearchField={setSearchField}
            homeWorldNames={homeWorldNames}
            setSelectedHomeWorld={setSelectedHomeWorld}
            searchField={searchField}
            selectedHomeWorld={selectedHomeWorld}
          />
          <List data={paginatedData} animalImages={animalImages} />
          <Pagination
            onPageChange={handlePageChange}
            currentPage={currentPage}
            totalPages={numberOfPages}
          />
        </VStack>
      ) : (
        <Flex justify="center" align="center" h="75vh">
          API Server Is Down
        </Flex>
      )}
    </div>
  );
};

export default CardList;
