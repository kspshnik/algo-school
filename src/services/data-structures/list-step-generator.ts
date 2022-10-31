import { ListStepIteratorInterface } from '../../types/algo-struct.types';

function* listStepGenerator(limit : number) : ListStepIteratorInterface {
  for (let i = 0; i <= limit; i += 1) {
    yield i;
  }
}

export default listStepGenerator;
