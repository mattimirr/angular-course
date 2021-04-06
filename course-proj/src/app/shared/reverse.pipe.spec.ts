import { ReversePipe } from './reverse.pipe';


describe('Pipe: ReversePipe', () => {
  it('should create', () => {
      let reversePipe = new ReversePipe();
    expect(reversePipe.transform('hello')).toEqual('olleh');
  });

});
