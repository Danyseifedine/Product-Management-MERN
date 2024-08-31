import { useCounterStore } from "../store/counter"
import { Heading, Spinner, Button, ButtonGroup } from "@chakra-ui/react"



const Test = () => {

    // const counter = useCounterStore((state) => state.counter)
    // const increment = useCounterStore((state) => state.increment)
    // const decrement = useCounterStore((state) => state.decrement)
    // const incrementAsync = useCounterStore((state) => state.incrementAsync)

    const { counter, increment, decrement, incrementAsync, loading } = useCounterStore();


  return (
    <div>
        <Heading as="h1" size="lg">
          Counter: {" "}
          {loading ? (
            <Spinner size="sm" color="blue.500" />
          ) : (
            counter
          )}
        </Heading>
            <ButtonGroup spacing={4} marginTop={4}>
                <Button onClick={increment} colorScheme="blue">
                    Increment
                </Button>
                <Button onClick={decrement} colorScheme="green">
                    Decrement
                </Button>
                <Button onClick={incrementAsync} colorScheme="purple" isLoading={loading} loadingText="Loading...">
                    Increment Async
                </Button>
            </ButtonGroup>
    </div>
  )
}

export default Test
