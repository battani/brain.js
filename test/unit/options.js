var assert = require('should'),
    _ = require("underscore"),
    brain = require("../../lib/brain");

describe('neural network options', function() {
  it('hidden', function() {
    var net = new brain.NeuralNetwork({ hiddenLayers: [8, 7] });

    net.train([{input: [0, 0], output: [0]},
               {input: [0, 1], output: [1]},
               {input: [1, 0], output: [1]},
               {input: [1, 1], output: [0]}]);

    var json = net.toJSON();

    assert.equal(json.layers.length, 4);
    assert.equal(_(json.layers[1]).keys().length, 8);
    assert.equal(_(json.layers[2]).keys().length, 7);
  })

  it('learningRate - higher learning rate should train faster', function() {
    var data = [{input: [0, 0], output: [0]},
                {input: [0, 1], output: [1]},
                {input: [1, 0], output: [1]},
                {input: [1, 1], output: [1]}];

    var net1 = new brain.NeuralNetwork({ learningRate: 0.5 });
    var iters1 = net1.train(data).iterations;

    var net2 = new brain.NeuralNetwork({ learningRate: 0.8 });
    var iters2 = net2.train(data).iterations;

    assert.ok(iters1 > (iters2 * 1.1), iters1 + " !> " + iters2 * 1.1);
  })

  it('momentum - higher momentum should train faster', function() {
    var data = [{input: [0, 0], output: [0]},
                {input: [0, 1], output: [1]},
                {input: [1, 0], output: [1]},
                {input: [1, 1], output: [1]}];

    var net1 = new brain.NeuralNetwork({ momentum: 0.1 });
    var iters1 = net1.train(data).iterations;

    var net2 = new brain.NeuralNetwork({ momentum: 0.5 });
    var iters2 = net2.train(data).iterations;

    assert.ok(iters1 > (iters2 * 1.1), iters1 + " !> " + (iters2 * 1.1));
  })
})
