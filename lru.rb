

class Node
    attr_accessor :value, :next_node, :prev_node
    
    def initialize(value, prev_node, next_node)
        @value = value
        @prev_node = prev_node
        @next_node = next_node
    end
end

class LRU
  attr_accessor :head, :tail, :num_items, :max_items
  def initialize(max_items)
    @max_items = max_items
    @table = {}
    @head = nil
    @tail = nil
    @num_items = 0
  end

  def set(key, value)
    @num_items += 1
    if @num_items > @max_items
      @head = @head.next_node
    end

    new_node = Node.new value, @tail, nil
    @head = new_node if tail == nil 
    @tail.next_node = new_node if @tail != nil
    @tail = new_node
    @table[key] = new_node 
  end
  
  def get(key)
    res = @table[key]
    return res if res.next_node == nil

    if res.prev_node != nil
      res.prev_node.next_node = res.next_node
    else
      @head = res.next_node
      @head.prev_node = nil
    end

    @tail.next_node = res
    res.next_node = nil
    res.prev_node = @tail
    @tail = res
  end
end 