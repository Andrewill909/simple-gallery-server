const { expect } = require('chai');
const sinon = require('sinon');
const axios = require('axios');
const feedController = require('../Controller/feed');

describe('Feed Controller - index', function () {
  it('Should return response with status OK if fetching feed succeed', function (done) {
    const axiosStub = sinon.stub(axios, 'get').resolves({});

    const req = { query: {} };
    const res = {
      statusCode: 500,
      status: 'ERROR',
      status: function (httpCode) {
        this.statusCode = httpCode;
        return this;
      },
      json: function (result) {
        this.status = result.status;
      },
    };
    feedController
      .index(req, res, () => {})
      .then(() => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.status).to.be.equal('OK');
        done();
        axiosStub.restore();
      });
  });

  it('Should call next function when fectching feed fails', function (done) {
    const axiosStub = sinon.stub(axios, 'get').throws();
    let nextSpy = sinon.spy();

    const req = { query: {} };
    const res = {};
    feedController.index(req, res, nextSpy);
    expect(nextSpy.called).to.be.true;
    done();
    axiosStub.restore();
  });
});
