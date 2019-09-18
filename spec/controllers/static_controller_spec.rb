describe 'StaticController' do
  describe 'static#index' do
    context 'when user is not logged in' do
      it 'should redirect to the login page'
    end

    context 'when user is logged in' do
      it 'should render the index page'
    end
  end

  describe 'static#login' do
    context 'when user is not logged in' do
      it 'should render the login page'
    end
    context 'when user is logged in' do
      it 'should redirect to the index page'
    end
  end
end
