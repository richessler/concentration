
class Node
    attr_accessor :value, :next_node, :prev_node
    
    def initialize(value, prev_node, next_node)
        @value = value
        @prev_node = prev_node
        @next_node = next_node
    end
end
