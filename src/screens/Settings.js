import React from "react";
import {
  Container,
  Content,
  Button,
  ListItem,
  Text,
  Icon,
  Body,
  Right,
  Switch,
  Header,
  Title,
  Left,
} from "native-base";

const Settings = () => {
  return (
    <Container>
      <Header transparent>
        <Left>
          <Button transparent>
            <Icon style={{ color: "#000000" }} name="settings" />
          </Button>
        </Left>
        <Body>
          <Title style={{ color: "#000000" }}>Settings</Title>
        </Body>
        <Right></Right>
      </Header>
      <Content>
        <ListItem icon>
          <Left>
            <Button style={{ backgroundColor: "#FF9501" }}>
              <Icon active name="airplane" />
            </Button>
          </Left>
          <Body>
            <Text>Airplane Mode</Text>
          </Body>
          <Right>
            <Switch value={false} />
          </Right>
        </ListItem>
        <ListItem icon>
          <Left>
            <Button style={{ backgroundColor: "#007AFF" }}>
              <Icon active name="wifi" />
            </Button>
          </Left>
          <Body>
            <Text>Wi-Fi</Text>
          </Body>
          <Right>
            <Text>GeekyAnts</Text>
            <Icon active name="arrow-forward" />
          </Right>
        </ListItem>
        <ListItem icon>
          <Left>
            <Button style={{ backgroundColor: "#007AFF" }}>
              <Icon active name="bluetooth" />
            </Button>
          </Left>
          <Body>
            <Text>Bluetooth</Text>
          </Body>
          <Right>
            <Text>On</Text>
            <Icon active name="arrow-forward" />
          </Right>
        </ListItem>
      </Content>
    </Container>
  );
};

export default Settings;
